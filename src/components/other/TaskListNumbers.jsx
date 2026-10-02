import React from 'react'

const TaskListNumbers = ({data}) => {
  return (
    <div className='flex mt-10 justify-between gap-5 screen'>

       <div className='py-6 px-9 rounded-xl w-[45%] bg-red-400'>
        <h1 className='text-2xl font-semibold'>{data.taskCounts.newTask}</h1>
        <h3 className='text-3xl font-medium'>New Task</h3>
       </div>

       <div className='py-6 px-9 rounded-xl w-[45%] bg-yellow-500'>
        <h1 className='text-2xl font-semibold'>{data.taskCounts.completed}</h1>
        <h3 className='text-3xl font-medium'>Completed Task</h3>
       </div>

       <div className='py-6 px-9 rounded-xl w-[45%] bg-blue-400'>
        <h1 className='text-2xl font-semibold'>{data.taskCounts.active}</h1>
        <h3 className='text-3xl font-medium'>Accepted Task</h3>
       </div>

       <div className='py-6 px-9 rounded-xl w-[45%] bg-green-400'>
        <h1 className='text-2xl font-semibold'>{data.taskCounts.failed}</h1>
        <h3 className='text-3xl font-medium'>Failed Task</h3>
       </div>
    </div>
  )
}

export default TaskListNumbers

