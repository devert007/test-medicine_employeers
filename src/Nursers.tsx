import React, { useState, useEffect } from "react";
import useFetch from "./hooks/useFetch";
import { InfoEmployee, INurser } from "./hooks/useFetch";
import { URL_DATABASE_NURSERS } from "./constants/constants";
import Table from "./Table";

const Nursers: React.FC = () => {
  const [arrayNursers, setArrayNurser] = useState<InfoEmployee[]>([]);
  const { data, loading, error } = useFetch(URL_DATABASE_NURSERS);
  const [inputValueName, setInputValueName] = useState("");
  const [inputValueDepartment, setInputValueDepartment] =
    useState("Кардиологическое");
  const [isHead, setIsHead] = useState<boolean>(false);
  const [selectedDoctorId, setSelectedNurserId] = useState<number | null>(null);

  useEffect(() => {
    if (data) {
      setArrayNurser(data);
    }
  }, [data]);

  const handlerAddNurser = () => {
    const newDoctor: INurser = {
      id: arrayNursers.length ? arrayNursers.length : 0,
      name: inputValueName,
      department: inputValueDepartment,
    };

    setArrayNurser((prev) => [...prev, newDoctor]);
    setInputValueName("");
    setInputValueDepartment("Кардиологическое");
    setIsHead(false);
  };

  const handlerRemoveNurser = (id: number) => {
    setArrayNurser((prev) => prev.filter((doctor) => doctor.id !== id));
  };

  const handlerEditNurser = () => {
    if (selectedDoctorId !== null) {
      setArrayNurser((prev) =>
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
      setSelectedNurserId(null);
      setInputValueName("");
      setInputValueDepartment("Кардиологическое");
      setIsHead(false);
    }
  };

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center font-bold text-2xl">Список медсестер</h1>
      <div className="overflow-x-auto mt-6">
        <Table
          employeeArray={arrayNursers}
          setInputValueName={setInputValueName}
          setInputValueDepartment={setInputValueDepartment}
          removeEmployee={handlerRemoveNurser}
          setSelectedId={setSelectedNurserId}
					isDoctor={false}
        />
      </div>

      <div className="mt-6">
        <input
          type="text"
          placeholder="Имя медсестры"
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

        <div className="mt-4">
          <button
            onClick={
              selectedDoctorId === null ? handlerAddNurser : handlerEditNurser
            }
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            {selectedDoctorId === null
              ? "Добавить врача"
              : "Редактировать врача"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nursers;