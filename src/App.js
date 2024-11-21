import Header from "./Header";
import SearchProduct from "./SearchProduct";
import AddProduct from "./AddProduct";
import Footer from "./Footer";
import Content from "./Content";
import { useState } from "react";

function App() {
	const [products, setProducts] = useState(
		JSON.parse(localStorage.getItem("shoppinglist")) || [
			{
				id: 1,
				item: "Beans",
				checked: true,
			},
			{
				id: 2,
				item: "Chips",
				checked: true,
			},
		]
	);

	const [newProduct, setNewProduct] = useState("");
	const [search, setSearch] = useState("");

	// Add products to localStorage and update state.
	const setAndSaveItems = (newProducts) => {
		setProducts(newProducts);
		localStorage.setItem("shoppinglist", JSON.stringify(newProducts));
	};

	// Add new products to the array of products.
	const addProduct = (product) => {
		const id = products.length ? products[products.length - 1].id + 1 : 1; // increment the product.id of the new product.
		const myNewProduct = {
			id,
			product,
			checked: false,
		};

		const listProducts = [...products, myNewProduct];
		setAndSaveItems(listProducts);
	};

	// function to toggle the checked state
	const handleCheck = (id) => {
		const listProducts = products.map((product) =>
			product.id === id ? { ...product, checked: !product.checked } : product
		);
		setAndSaveItems(listProducts);
	};

	// function to delete products in the UI.
	const handleDelete = (id) => {
		const listProducts = products.filter((product) => product.id !== id);
		setAndSaveItems(listProducts);
	};

	// Fuction to submit the form.
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!newProduct) return;
		addProduct(newProduct);
		setNewProduct("");
	};

	return (
		<div className="App">
			<Header title="Groceries" />
			<AddProduct
				newProduct={newProduct}
				setNewProduct={setNewProduct}
				handleSubmit={handleSubmit}
			/>
			<SearchProduct search={search} setSearch={setSearch} />
			<Content
				products={products.filter((product) =>
					product.product.toLowerCase().includes(search.toLowerCase())
				)} // search functionality.
				handleCheck={handleCheck}
				handleDelete={handleDelete}
			/>
			<Footer length={products.length} />
		</div>
	);
}

export default App;
