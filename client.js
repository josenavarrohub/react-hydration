// Data
const fruits = [
  { name: "Banana", icon: "🍌", price: 0.8 },
  { name: "Lemon", icon: "🍋", price: 0.2 },
  { name: "Orange", icon: "🍊", price: 0.4 },
  { name: "Watermelon", icon: "🍉", price: 2.4 },
  { name: "Pineapple", icon: "🍍", price: 3.0 },
];

// Components
const FruitItem = ({ fruit }) => {
	const [quantity, setQuantity] = React.useState(0);
	return (
	  <li className="c-fruit-item" key={fruit.name}>
		<span>
		  {fruit.icon} {fruit.name}
		</span>
		<span>
		  {quantity} x {fruit.price} € = {(quantity * fruit.price).toFixed(2)} €
		</span>
		<button onClick={() => setQuantity((q) => q + 1)}>+1</button>
	  </li>
	);
  };
  
  const FruitList = () => {
	return (
	  <div className="c-fruit-list">
		<h1>💦 React Hydration 💦</h1>
		<p>This component has been rendered on the server!</p>
		<ul>
		  {fruits.map((fruit) => (
			<FruitItem fruit={fruit} key={fruit.name} />
		  ))}
		</ul>
	  </div>
	);
  };

// Hydration
ReactDOM.hydrateRoot(document.getElementById("root"), <FruitList />);
