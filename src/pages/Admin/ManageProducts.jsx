import { useEffect, useState } from "react";
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../../services/product/product.service";
import AdminSidebar from "../../components/layout/AdminSidebar/AdminSidebar";
import Input from "../../components/common/Input/Input";
import Snackbar from "../../components/common/Snackbar/Snackbar";
import Loader from "../../components/common/Loader/Loader";
import { useFormik } from "formik";
import productSchema from "../../utils/validation/productSchema";
import "./ManageProducts.scss";
const LOCAL_KEY = "admin_products";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({
        isOpen: false,
        message: "",
        type: "success",
    });
    
    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const res = await getAllProducts();
            const apiProducts =
                Array.isArray(res)
                    ? res
                    : Array.isArray(res?.products)
                        ? res.products
                        : [];
            const localProducts =
                JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];
            setProducts([...localProducts, ...apiProducts]);
        } catch (error) {
            console.error("Failed to fetch products", error);
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);
    
    const getNextProductId = () => {
        const stored = JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];
        if (stored.length === 0) {
            return 21; 
        }
        const maxId = Math.max(...stored.map(p => p.id || 0));
        return Math.max(maxId + 1, 21); 
    };
    
    const formik = useFormik({
        initialValues: {
            title: "",
            price: "",
            description: "",
            category: "",
            image: "",
        },
        validationSchema: productSchema,
        onSubmit: async (values, { resetForm }) => {
            if (editingId) {
                try {
                    await updateProduct(editingId, values);
                    setProducts((prev) =>
                        prev.map((p) =>
                            p.id === editingId ? { ...p, ...values } : p
                        )
                    );
                    const stored = JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];
                    localStorage.setItem(
                        LOCAL_KEY,
                        JSON.stringify(
                            stored.map((p) =>
                                p.id === editingId ? { ...p, ...values } : p
                            )
                        )
                    );
                    setSnackbar({
                        isOpen: true,
                        message: "Product updated successfully",
                    });
                } catch (error) {
                    console.error("Failed to update product", error);
                    setSnackbar({
                        isOpen: true,
                        message: "Failed to update product",
                        type: "error",
                    });
                }
            } else {
                try {
                    const apiRes = await createProduct(values);
                    const newProductId = getNextProductId();
                    const newProduct = apiRes?.data?.product || {
                        ...values,
                        id: newProductId,
                    };
                    newProduct.id = newProductId;
                    
                    const stored = JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];
                    localStorage.setItem(
                        LOCAL_KEY,
                        JSON.stringify([newProduct, ...stored])
                    );
                    setProducts((prev) => [newProduct, ...prev]);
                    setSnackbar({
                        isOpen: true,
                        message: "Product added successfully",
                    });
                } catch (error) {
                    console.error("Failed to create product", error);
                    setSnackbar({
                        isOpen: true,
                        message: "Failed to add product",
                        type: "error",
                    });
                }
            }
            resetForm();
            setEditingId(null);
            setShowForm(false);
        },
    });
    
    const handleEdit = async (id) => {
        const stored = JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];
        const localProduct = stored.find(p => p.id === id);
        
        if (localProduct) {
            formik.setValues({
                title: localProduct.title || "",
                price: localProduct.price || "",
                description: localProduct.description || "",
                category: localProduct.category || "",
                image: localProduct.image || "",
            });
            setEditingId(id);
            setShowForm(true);
        } else {
            try {
                const res = await getProductById(id);
                const productData = res || {};
                
                formik.setValues({
                    title: productData.title || "",
                    price: productData.price || "",
                    description: productData.description || "",
                    category: productData.category || "",
                    image: productData.image || "",
                });
                setEditingId(id);
                setShowForm(true);
            } catch (error) {
                console.error("Failed to fetch product for edit", error);
                setSnackbar({
                    isOpen: true,
                    message: "Failed to fetch product details",
                    type: "error",
                });
            }
        }
    };
    
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this product?")) return;
        setProducts((prev) => prev.filter((p) => p.id !== id));
        const stored = JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];
        localStorage.setItem(
            LOCAL_KEY,
            JSON.stringify(stored.filter((p) => p.id !== id))
        );
        try {
            await deleteProduct(id);
        } catch {
            console.warn("API delete skipped");
        }
        setSnackbar({
            isOpen: true,
            message: "Product deleted successfully",
        });
    };
    const handleCloseForm = () => {
        formik.resetForm();
        setEditingId(null);
        setShowForm(false);
    };
    return (
        <div className="admin-layout">
            <AdminSidebar />
            <div className="manage-products">
                <div className="header">
                    <h2>Manage Products</h2>
                    <button
                        className="add-btn"
                        onClick={() => {
                            formik.resetForm();
                            setEditingId(null);
                            setShowForm(true);
                        }}
                    >
                        + Add Product
                    </button>
                </div>
                {showForm && (
                    <form className="product-form" onSubmit={formik.handleSubmit}>
                        <button
                            type="button"
                            className="close-btn"
                            onClick={handleCloseForm}
                        >
                            ×
                        </button>
                        <Input label="Title" name="title" {...formik.getFieldProps("title")} />
                        <Input label="Price" name="price" type="number" {...formik.getFieldProps("price")} />
                        <Input label="Category" name="category" {...formik.getFieldProps("category")} />
                        <Input label="Image URL" name="image" {...formik.getFieldProps("image")} />
                        <Input label="Description" name="description" {...formik.getFieldProps("description")} />
                        <button type="submit" className="submit-btn">
                            {editingId ? "Update Product" : "Add Product"}
                        </button>
                    </form>
                )}
                {isLoading ? (
                    <Loader text="Loading products..." />
                ) : (
                    <table className="products-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: "center" }}>
                                        No products found
                                    </td>
                                </tr>
                            ) : (
                                products.map((p) => (
                                    <tr key={p.id}>
                                        <td><img src={p.image} alt={p.title} /></td>
                                        <td>{p.title}</td>
                                        <td>{p.category}</td>
                                        <td>${p.price}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="edit-btn" onClick={() => handleEdit(p.id)}>Edit</button>
                                                <button className="delete-btn" onClick={() => handleDelete(p.id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
                <Snackbar
                    isOpen={snackbar.isOpen}
                    message={snackbar.message}
                    onClose={() =>
                        setSnackbar({ ...snackbar, isOpen: false })
                    }
                />
            </div>
        </div>
    );
};
export default ManageProducts;