import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { getHouse, putHouse } from "../../services/api";

const HouseEdit = ({ match }) => {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const queryClient = useQueryClient();

  const [house, setHouse] = useState(null);
  const { id } = match.params;

  const { mutateAsync } = useMutation(putHouse, {
    onSuccess: () => {
      queryClient.invalidateQueries("houses");
      history.push("/");
    },
  });

  const onSubmit = async (data) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchHouse = async () => {
      const { data } = await getHouse(id);
      setHouse(data);
    };

    fetchHouse();
  }, [id]);

  if (!house) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          defaultValue={house.title}
          {...register("title")}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          defaultValue={house.description}
          {...register("description")}
        />
      </div>
      <div>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          defaultValue={house.address}
          {...register("address")}
        />
      </div>
      <div>
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          defaultValue={house.price}
          {...register("price")}
        />
      </div>
      <button type="submit">Update</button>
    </form>
  );
};

export default HouseEdit;
