import Image from "next/image"
import { useState } from "react"

type Input = {
  id: string
  type: string
  placeholder: string
}

const Input = (input: Input) => {
  return (
    <div>
      <label htmlFor={input.id} className="block text-xs font-medium text-gray-700">
        {input.id}
      </label>
      <input
        type={input.type}
        id={input.id}
        placeholder={input.placeholder}
        className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
      />
    </div>
  )
}

const Button = () => {
  const [coppy, setCoppy] = useState<Boolean>()

  return (
    <button
      className="inline-block rounded bg-indigo-600 px-6 py-2 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500 w-full"
      onClick={() => {setCoppy(true)}}
    >
      {coppy ? 'Copied' : 'Copy'}
    </button>
  )
}

const Form = () => {
  return (
    <div className="space-y-4">
      <Input id="User" type="text" placeholder="supabase" />
      <Input id="Repo" type="text" placeholder="supabase" />
      <Input id="Count" type="number" placeholder="30" />
      <Input id="Radius" type="number" placeholder="130rem" />
      <Input id="Spacing" type="number" placeholder="0.5rem" />
      <Input id="Image size" type="number" placeholder="100px" />
      <Input id="Screen width" type="number" placeholder="1200px" />
      <Input id="Screen height" type="number" placeholder="600px" />
    </div>
  )
}

const Home = () => {
  return (
    <div className="my-10 mx-auto container">
      <div className="mb-10">
        <h1 className="text-center text-4xl font-semibold">Contributors</h1>
      </div>
      <div className="flex space-x-10">
        <div className="w-1/2">
          <Form />
        </div>
        <div className="w-1/2">
          <Image src={"http://localhost:3000/api/supabase/supabase"} width={1200} height={600} alt={""} />
          <div className="flex space-x-2 items-end">
            <div className="w-full">
              <Input id="URL" type="text" placeholder="http://localhost:3000/api/supabase/supabase" />
            </div>
            <div className="flex space-x-2">
              <Button />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
