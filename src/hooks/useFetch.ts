import { useEffect, useState } from "react";

export interface IDoctor {
	id: number;
	name: string;
	department: string;
	isHead: boolean;
}

export interface INurser {
	id: number;
	name: string;
	department: string;
}

export type InfoEmployee = IDoctor | INurser;

const useFetch = (link: string) => {
	const [data, setData] = useState<InfoEmployee[] | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(link);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const result = await response.json();
				setData(result);
			} catch (err) {
				setError((err as Error).message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [link]);

	return { data, loading, error };
};

export default useFetch;
