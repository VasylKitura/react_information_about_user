import React, { useState, useEffect } from 'react'; 

const Form = () => {
  const [reservation, setReservation] = useState({
     fname: '', 
     surname: '',
     email: '',
     date_birthday: '',
     city: ''
    });

  const [list, setList] = useState([]);
  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('i'));
    if (list) {
      setList(list);
    }
  }, []);
  

  useEffect(()=>{
    localStorage.setItem('i',JSON.stringify(list))
  },[list])
  const handleChange = (e) => {
    const value = e.target.value;
    setReservation({ ...reservation, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
         if (reservation.fname && reservation.surname &&  reservation.date_birthday && reservation.email  && reservation.city) {
      const newReservation = { ...reservation, id: new Date().getTime().toString() };
      setList([...list, newReservation]);
      setReservation({ 
        fname: '',
        surname: '',
        date_birthday: '', 
        email: '',
        city: '',
        edit: false });
    }
  };
  
  const removeItem = (id) =>{
    let newReserv = list.filter(list =>
      list.id !==id)
      setList(newReserv)
  };

  const findeditItem = (id,) =>{
    let newReserv = list.filter(list =>
      list.id !==id)
    const findIten = list.find(list =>
      list.id === id)
      console.log(findIten)
      setReservation(
        {
        fname: findIten.fname,
        surname: findIten.surname, 
        email: findIten.email,
        date_birthday: findIten.date_birthday,
        city: findIten.city,
        edit: true
        }
      )
      setList(newReserv)
    }

  return (
    <>
      <article className='form'>
        <form>
          <h1>{reservation.edit?"Edit information about yourself":"Add information about yourself"}</h1>
          <div className='form-control'>
            <label htmlFor='firstName'>Name : </label>
            <input
              type='text'
              id='fname'
              name='fname'
              value={reservation.fname}
              onChange={handleChange}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='surname'>Surname : </label>
            <input
              type='text'
              id='surname'
              name='surname'
              value={reservation.surname}
              onChange={handleChange}
            /></div>
          <div className='form-control'>
            <label htmlFor='email'>Email : </label>
            <input
              type='email'
              id='email'
              name='email'
              value={reservation.email}
              onChange={handleChange}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='count'>Date birthday:</label>
            <input
              type='date'
              id='date_birthday'
              name='date_birthday'
              value={reservation.date_birthday}
              onChange={handleChange}
            />
           </div>
          <div className='form-control'>
            <label htmlFor='ldate'>City : </label>
            <input
              type='text'
              id='city'
              name='city'
              value={reservation.city}
              onChange={handleChange}
            />
           </div>
          <button type='submit' className='button' onClick={handleSubmit}>
            {reservation.edit?"Edit":"Add"}
          </button>
        </form>
      </article>
      <article className="list">          
      <button className='btn' onClick={()=>setList([])}>Clear data</button>
        {list.map((reservation) => {
          const { id, fname, surname, email, date_birthday, city} = reservation;
  
          return (
            <div key={id} className='item'>
              <h2>{fname} {surname}</h2>
              <p>{email}</p>
              <p>{date_birthday}</p>
              <p>{city}</p>              
              <button onClick={()=>findeditItem(id)}>Edit</button>
              <button className="btn2" onClick={()=>removeItem(id)}> Delete</button>
            </div>
          );
        })}

      </article>
    </>
  );
};

export default Form;
