import React, { useState, useEffect } from "react";
import useFetch from "./hooks/useFetch";
import { InfoEmployee, IDoctor } from "./hooks/useFetch";
import {URL_DATABASE_DOCTORS,} from './constants/constants'
import Table from "./Table";
const Doctors: React.FC = () => {
  const [arrayDoctors, setArrayDoctors] = useState<InfoEmployee[]>([]);
  const { data, loading, error } = useFetch(URL_DATABASE_DOCTORS);
  const [inputValueName, setInputValueName] = useState("");
  const [inputValueDepartment, setInputValueDepartment] = useState("Кардиологическое"); 
  const [isHead, setIsHead] = useState<boolean>(false); 
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null); 
  useEffect(() => {
    if (data) {
      setArrayDoctors(data.filter(isDoctor));
    }
  }, [data]);

  // Функция добавления нового врача
  const handlerAddDoctor = () => {
    const newDoctor: IDoctor = {
      id: arrayDoctors.length ? arrayDoctors.length : 0,
      name: inputValueName,
      department: inputValueDepartment,
      isHead,
    };

    setArrayDoctors((prev) => [...prev, newDoctor]);
    setInputValueName("");
    setInputValueDepartment("Кардиологическое"); 
    setIsHead(false); 
    console.log("Добавлен новый врач:", newDoctor);
  };

  // Функция удаления врача
  const handlerRemoveDoctor = (id: number) => {
    setArrayDoctors((prev) => prev.filter((doctor) => doctor.id !== id));
  };

  // Функция редактирования врача
  const handlerEditDoctor = () => {
    if (selectedDoctorId !== null) {
      setArrayDoctors((prev) =>
        prev.map((doctor) =>
          doctor.id === selectedDoctorId
            ? {
                ...doctor,
                name: inputValueName,
                department: inputValueDepartment,
                isHead,
              }
            : doctor
        )
      );
      setSelectedDoctorId(null); 
      setInputValueName("");
      setInputValueDepartment("Кардиологическое");
      setIsHead(false);
    }
  };

  // Фильтрация по типу "доктор"
  const isDoctor = (employee: InfoEmployee): employee is IDoctor => {
    return (employee as IDoctor).isHead !== undefined;
  };

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center font-bold text-2xl">Список врачей</h1>

      <div className="overflow-x-auto mt-6">
      <Table
          employeeArray={arrayDoctors}
          setInputValueName={setInputValueName}
          setInputValueDepartment={setInputValueDepartment}
          removeEmployee={handlerRemoveDoctor}
          setSelectedId={setSelectedDoctorId}
          isDoctor={true}
        />
      </div>

      <div className="mt-6">
        <input
          type="text"
          placeholder="Имя врача"
          value={inputValueName}
          onChange={(e) => setInputValueName(e.target.value)}
          className="border px-4 py-2 rounded-md mr-2"
        />
        
        <select
          value={inputValueDepartment}
          onChange={(e) => setInputValueDepartment(e.target.value)}
          className="border px-4 py-2 rounded-md mr-2"
        >
          <option value="Кардиологическое">Кардиологическое</option>
          <option value="Хирургическое">Хирургическое</option>
        </select>

        <div className="flex items-center">
          <label htmlFor="isHead" className="mr-2">Заведующий:</label>
          <input
            type="checkbox"
            id="isHead"
            checked={isHead}
            onChange={() => setIsHead(!isHead)}
            className="w-4 h-4"
          />
        </div>

        <div className="mt-4">
          <button
            onClick={selectedDoctorId === null ? handlerAddDoctor : handlerEditDoctor} 
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            {selectedDoctorId === null ? "Добавить врача" : "Редактировать врача"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
