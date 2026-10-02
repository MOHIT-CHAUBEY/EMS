import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const CreateTask = () => {
  const [userData, setUserData] = useContext(AuthContext);

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [asignTo, setAsignTo] = useState('');
  const [category, setCategory] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    // Check whether employee data is available
    if (!userData || !Array.isArray(userData.employees)) {
      alert('Employee data is still loading. Please try again.');
      return;
    }

    // Check required fields
    if (
      !taskTitle.trim() ||
      !taskDescription.trim() ||
      !taskDate ||
      !asignTo ||
      !category.trim()
    ) {
      alert('Please fill in all the fields.');
      return;
    }

    // Find the selected employee
    const employeeExists = userData.employees.some(
      (employee) => String(employee.id) === asignTo
    );

    if (!employeeExists) {
      alert('Please select a valid employee.');
      return;
    }

    // Create a new task
    const newTask = {
      taskTitle: taskTitle.trim(),
      taskDescription: taskDescription.trim(),
      taskDate,
      category: category.trim(),
      active: false,
      newTask: true,
      failed: false,
      completed: false,
    };

    // Add task to the selected employee only
    const updatedEmployees = userData.employees.map((employee) => {
      if (String(employee.id) === asignTo) {
        return {
          ...employee,
          tasks: [...(employee.tasks || []), newTask],
          taskCounts: {
            ...employee.taskCounts,
            newTask: (employee.taskCounts?.newTask || 0) + 1,
          },
        };
      }

      return employee;
    });

    // Update shared employee data
    setUserData({
      ...userData,
      employees: updatedEmployees,
    });

    // Clear the form
    setTaskTitle('');
    setTaskDescription('');
    setTaskDate('');
    setAsignTo('');
    setCategory('');

    alert('Task created successfully!');
  };

  return (
    <div className="p-5 bg-[#1c1c1c] mt-5 rounded">
      <form
        onSubmit={submitHandler}
        className="flex flex-wrap w-full items-start justify-between"
      >
        <div className="w-full md:w-1/2">
          <div>
            <h3 className="text-sm text-gray-300 mb-1">Task Title</h3>
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="text-sm py-2 px-3 w-full md:w-4/5 rounded outline-none bg-transparent border border-gray-500 text-white"
              type="text"
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="mt-4">
            <h3 className="text-sm text-gray-300 mb-1">Date</h3>
            <input
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className="text-sm py-2 px-3 w-full md:w-4/5 rounded outline-none bg-transparent border border-gray-500 text-white"
              type="date"
              required
            />
          </div>

          <div className="mt-4">
            <h3 className="text-sm text-gray-300 mb-1">Assign To</h3>
            <select
              value={asignTo}
              onChange={(e) => setAsignTo(e.target.value)}
              className="text-sm py-2 px-3 w-full md:w-4/5 rounded outline-none bg-[#1c1c1c] border border-gray-500 text-white"
              required
            >
              <option value="">Select Employee</option>

              {userData?.employees?.map((employee) => (
                <option key={employee.id} value={String(employee.id)}>
                  {employee.firstName}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <h3 className="text-sm text-gray-300 mb-1">Category</h3>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-sm py-2 px-3 w-full md:w-4/5 rounded outline-none bg-transparent border border-gray-500 text-white"
              type="text"
              placeholder="e.g. Design, Development"
              required
            />
          </div>
        </div>

        <div className="w-full md:w-2/5 flex flex-col items-start mt-4 md:mt-0">
          <h3 className="text-sm text-gray-300 mb-1">Description</h3>

          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="text-sm py-2 px-3 w-full h-44 rounded outline-none bg-transparent border border-gray-500 text-white resize-none"
            placeholder="Enter task description"
            required
          />

          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-600 py-3 px-5 rounded text-sm mt-4 w-full text-white font-semibold"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;


