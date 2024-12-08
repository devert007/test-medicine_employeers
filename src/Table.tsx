import React from "react";
import { InfoEmployee } from "./hooks/useFetch";
interface TableProps {
	employeeArray: InfoEmployee[];
	removeEmployee: (id: number) => void;
	setSelectedId: (id: number | null) => void;
	setInputValueName: (name: string) => void;
	setInputValueDepartment: (department: string) => void;
	isDoctor: boolean;
}
const Table: React.FC<TableProps> = ({
	employeeArray,
	removeEmployee,
	setSelectedId,
	setInputValueName,
	setInputValueDepartment,
	isDoctor,
}) => {
	return (
		<table className="min-w-full table-auto border-collapse border border-slate-500">
			<thead>
				<tr>
					<th className="border border-slate-600 px-6 py-3">ФИО</th>
					<th className="border border-slate-600 px-6 py-3">Отделение</th>
					<th className="border border-slate-600 px-6 py-3">Действия</th>
				</tr>
			</thead>
			<tbody>
				{employeeArray.map((empoyee: InfoEmployee) => (
					<tr key={empoyee.id}>
						<td className="border border-slate-700 px-6 py-3">
							{empoyee.name}
						</td>
						<td className="border border-slate-700 px-6 py-3">
							{empoyee.department}
						</td>
						{isDoctor && "isHead" in empoyee && (
							<td className="border border-slate-700 px-6 py-3">
								{empoyee.isHead ? "Да" : "Нет"}
							</td>
						)}
						<td className="border border-slate-700 text-center px-6 py-3">
							<button
								onClick={() => removeEmployee(empoyee.id)}
								className="text-red-500 hover:text-red-700"
							>
								Удалить
							</button>
							<button
								onClick={() => {
									setSelectedId(empoyee.id);
									setInputValueName(empoyee.name);
									setInputValueDepartment(empoyee.department);
								}}
								className="text-blue-500 hover:text-blue-700 ml-2"
							>
								Редактировать
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;
