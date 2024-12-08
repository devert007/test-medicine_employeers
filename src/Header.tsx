import { Link } from "react-router-dom";
const Header: React.FC = () => {
	return (
		<header className="flex justify-around ml-auto mr-auto h-20 items-center bg-teal-200">
			<div className="flex justify-around w-7/12">
				<Link className="text-lg font-bold" to="/doctors">
					Врачи
				</Link>
				<Link className="text-lg font-bold" to="/nurses">Медсестры</Link>
			</div>
		</header>
	);
};
export default Header;
