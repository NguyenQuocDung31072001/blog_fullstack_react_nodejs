import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  firstName: yup.string().required(),
  // age: yup.number().positive().integer().required(),
}).required();

export default function TestForm() {
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input className="bg-red-400" {...register("firstName")} />
      <p>{errors.firstName?.message}</p>
        
      <input className="bg-red-400" />
      {/* <p>{errors.age?.message}</p> */}
      
      <input type="submit" />
    </form>
  );
}
