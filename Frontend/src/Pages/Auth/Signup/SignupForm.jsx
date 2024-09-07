import { TextInput, PasswordInput } from "../../../Components";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../constant";

export function SignupForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const submitHandler = async () => {
    try {
      const values = getValues();

      const response = await axios.post(
        `${BASE_URL}/auth/register`,
        values
      );
      if (response.data.success === true) navigate("/login");
    } catch (err) {
      console.log(err.response.data);
      setError("root", { message: err.response.data.message });
    }
  };

  const validation = {
    email: {
      required: "Email is required",
      pattern: {
        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        message: "Invalid email format",
      },
    },
    password: {
      required: "Password is required",
      validate: (value) => {
        if (!/[A-Z]/.test(value))
          return "Must include at least one uppercase letter";
        if (!/[a-z]/.test(value))
          return "Must include at least one lowercase letter";
        if (!/[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]/.test(value))
          return "Must include at least one special character";
        if (value.length < 8) return "Min length should be 8";
        return true;
      },
    },
    recheckPassword: {
      required: "Enter password again",
      validate: (value) => {
        const password = watch("password"); // Get the value of the password field

        if (password !== value) {
          return "Passwords do not match";
        }
        return true;
      },
    },
    firstName: {
      required: "Firstname is required",
      pattern: {
        value: /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/,
        message: "Invalid format",
      },
    },
    lastName: {
      pattern: {
        value: /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/,
        message: "Invalid format",
      },
    },
    username: {
      required: "Username is required",
      validate: (value) => {
        if (value.length >= 20) return "Max length is 20";
        return true;
      },
    },
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="w-full max-w-md mx-auto px-4 sm:px-6">
      <TextInput
        registerDetails={{
          register,
          registerFor: "email",
          validation: validation.email,
        }}
        label="What's your email?"
        placeholder="Enter your email."
        classname="my-3"
      />
      {errors.email && (
        <div className="text-sm text-red-500">{errors.email.message}</div>
      )}

      <PasswordInput
        registerDetails={{
          register,
          registerFor: "password",
          validation: validation.password,
        }}
        label="Create a password"
        placeholder="Create a password"
        classname="my-3"
      />
      {errors.password && (
        <div className="text-sm text-red-500">{errors.password.message}</div>
      )}

      <PasswordInput
        attributes={{ onPaste: (e) => e.preventDefault() }}
        registerDetails={{
          register,
          registerFor: "recheckPassword",
          validation: validation.recheckPassword,
        }}
        label="Confirm your password"
        placeholder="Re-enter password"
        classname="my-3"
      />
      {errors.recheckPassword && (
        <div className="text-sm text-red-500">{errors.recheckPassword.message}</div>
      )}

      <div className="w-full flex flex-col sm:flex-row sm:space-x-8">
        <div className="flex-1 mb-3 sm:mb-0 w-full sm:w-[45%]">
          <TextInput
            registerDetails={{
              register,
              registerFor: "firstName",
              validation: validation.firstName,
            }}
            label="Enter First Name"
            placeholder="Enter your first name"
            classname="w-full"
          />
          {errors.firstName && (
            <div className="text-sm text-red-500">{errors.firstName.message}</div>
          )}
        </div>

        <div className="flex-1 mb-3 sm:mb-0 w-full sm:w-[45%]">
          <TextInput
            registerDetails={{
              register,
              registerFor: "lastName",
              validation: validation.lastName,
            }}
            label="Enter Last Name"
            placeholder="Enter your last name"
            classname="w-full"
          />
          {errors.lastName && (
            <div className="text-sm text-red-500">{errors.lastName.message}</div>
          )}
        </div>
      </div>

      <TextInput
        registerDetails={{
          register,
          registerFor: "username",
          validation: validation.username,
        }}
        label="What should we call you?"
        placeholder="Enter username"
        classname="my-3"
      />
      {errors.username && (
        <div className="text-sm text-red-500">{errors.username.message}</div>
      )}

      <div className="w-full mb-1 text-sm text-gray-700">
        This appears on your profile
      </div>
      {errors.root && (
        <div className="text-sm text-red-500">{errors.root.message}</div>
      )}

      <div className="w-full py-4 flex items-center justify-center">
        <button
          disabled={isSubmitting}
          type="submit"
          className="font-semibold py-2 px-6 bg-green-500 text-white rounded-full mt-2"
        >
          {isSubmitting ? "Loading..." : "SIGN UP"}
        </button>
      </div>
    </form>
  );
}
