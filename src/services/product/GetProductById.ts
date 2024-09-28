import axios from "axios"

const GetProductById = async (id: string) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/product/${id}`)
    return response.data
}

export default GetProductById