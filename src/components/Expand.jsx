import { useState } from "react"

export default function Expand({ children }) {
    const [open, setOpen] = useState(false);

  return (
    <>
        <div className="py-4">
            {/* Generate TailwindCSS classes in empty div for animation*/}
            <div className="rotate-180 rotate-90"></div>
            <button
                onClick={() => setOpen(!open)}
                className="text-teal-400 font-semibold tracking-wide"
            >
                <i class={`fa-solid fa-chevron-up mr-2 rotate-${open ? "180" : "90"} ease-in-out duration-75 transition-transform`}></i>
                Click to {open ? "hide" : "view"} data
            </button>
        </div>
        {open &&
            children
        }
    </>
  )
}
