import React  from 'react'

const Header = (props) => {

  const logOutUser = ()=>{
      
    localStorage.setItem('loggedInUser','')
    props.changeUser('')

  }

  return (
    <div className='flex items-end justify-between'>
        <h1 className='text-2xl font-medium'>Hello <br/><span className='text-3xl font-bold'>
  {props.data?.firstName || 'BOSS'} 👋
</span></h1>
        <button onClick={logOutUser} className='bg-red-600 text-lg  text-white px-5 py-2 rounded-sm font-medium  '> Log Out </button>
      
    </div>
  )
}

export default Header

