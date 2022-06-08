import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios'

export function Login2(props) {
    const { register, handleSubmit } = useForm();
    const [data, setData] = useState("");

    return (
    <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
        <input {...register("username")} placeholder="Email" />
        <input {...register("password")} placeholder="Password" />
        <p>{data}</p>
        <input type="submit" />
    </form>
    );
}

