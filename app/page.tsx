"use client";

import { useFormState } from "react-dom";
import { register } from "./actions";

const initialState = {
  success: false,
  message: "initial message",
};

export default function Index() {
  const [state, formAction] = useFormState(register, initialState);

  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <div className="bg-teal-700">
          <form action={formAction} className="flex flex-col">
            <input
              name="email"
              placeholder="Email"
              required
              className="p-2 my-1 mt-3 mx-4"
            />
            <input
              name="fullname"
              placeholder="Fullname"
              required
              className="p-2 my-1 mx-4"
            />
            <input
              name="password"
              placeholder="Password"
              required
              className="p-2 my-1 mx-4"
            />
            <input
              type="file"
              name="ProfileImage"
              required
              className="p-2 my-1 mx-4"
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="m-2 p-2 bg-teal-800 text-slate-100 font-bold "
              >
                Register
              </button>
            </div>
            {state.message && <div>Error: {state.message}</div>}
            {state.success && <div>Register successful!</div>}
          </form>
        </div>
      </main>
    </>
  );
}
