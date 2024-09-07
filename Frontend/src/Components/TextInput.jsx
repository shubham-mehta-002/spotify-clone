export function TextInput({
  label,
  placeholder,
  classname,
  registerDetails: { register, registerFor, validation },
}) {
  return (
    <div className={`w-full flex flex-col gap-2 mb-4 ${classname}`}>
      <label className="text-left font-bold">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        {...register(registerFor, validation)}
        className="border-2 border-solid border-gray-400 p-3 rounded placeholder-gray-500"
      />
    </div>
  );
}
