import { useEffect, useState } from 'react';
import { getHomes } from '../api';






function Homes() {
  const [homes, setHomes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHomes();
        setHomes(data);
      } catch (error) {
        console.error('Error fetching homes:', error);
      }
    };

    fetchData();
  }, []);



  return (
    <>
      {homes.map((home) => (

        <div className="col mb-5" key={home._id}>
          <div className="card h-100">
            {/*<!-- Product image-->*/}
            <img className="card-img-top" src={home.thumbnail} alt="..." />
            {/*<!-- Product details-->*/}
            <div className="card-body p-4">
              <div className="text-center">
                {/*<!-- Product name-->*/}
                <h5 className="fw-bolder">{home.address}</h5>
                {/*<!-- Product price-->*/}
                {home.price}
              </div>
            </div>
            {/*<!-- Product actions-->*/}
            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">View options</a></div>
            </div>
          </div>
        </div>
      ))}
    </>

  );
}

export default Homes;