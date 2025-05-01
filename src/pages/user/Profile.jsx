import React, { use, useState } from "react";
import sampleImg from "../../assets/sample.jpg";
import { useUpdateMember } from "../../hooks/userMember";

const Profile = () => {
  // User Credential from localstorage
  const userDetails = JSON.parse(localStorage.getItem("USER_DETAILS"));

  // Hook for updating member

  const { mutateAsync: updateMember } = useUpdateMember();

  // State for account management
  const [account, setAccount] = useState({
    username: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  // State for profile information
  const [profile, setProfile] = useState({
    _id: userDetails._id,
    fullName: userDetails.fullname || "",
    office: userDetails.office || "",
    positionOnBoard: userDetails.positionOnBoard || "",
    dateOfAppointment: userDetails.dateOfAppointment
      ? userDetails.dateOfAppointment.split("T")[0]
      : "",
    durationOfTerm: userDetails.durationOfTerm || "",
    expirationOfTerm: userDetails.expirationOfTerm
      ? userDetails.expirationOfTerm.split("T")[0]
      : "",
    email: userDetails.email || "",
    phoneNumber: userDetails.phoneNumber || "",
  });

  // State for image upload
  const [profileImage, setProfileImage] = useState(sampleImg);
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        // 2MB limit
        setErrors({ ...errors, image: "Image size should be less than 2MB" });
        return;
      }
      if (!file.type.match("image.*")) {
        setErrors({ ...errors, image: "Please upload an image file" });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setImageFile(file);
      };
      reader.readAsDataURL(file);
      setErrors({ ...errors, image: "" });
    }
  };

  // Handle input changes
  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccount({ ...account, [name]: value });
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // Account validation
    if (
      account.newPassword &&
      account.newPassword !== account.confirmPassword
    ) {
      newErrors.password = "Passwords don't match";
    }

    // Profile validation
    if (!profile.fullName) newErrors.fullName = "Full name is required";
    if (!profile.office) newErrors.office = "Office is required";
    if (!profile.positionOnBoard)
      newErrors.positionOnBoard = "Position is required";
    if (!profile.dateOfAppointment)
      newErrors.dateOfAppointment = "Appointment date is required";
    if (!profile.durationOfTerm)
      newErrors.durationOfTerm = "Term Duration is required";
    if (!profile.expirationOfTerm)
      newErrors.expirationOfTerm = "End of Term is required";

    if (!profile.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(profile.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!profile.phoneNumber)
      newErrors.phoneNumber = "Phone number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await updateMember(profile);
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrors({
        ...errors,
        form: "Failed to update profile. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle credentials change
  const handleCredentialsChange = (e) => {
    e.preventDefault();
    if (
      account.newPassword &&
      account.newPassword !== account.confirmPassword
    ) {
      setErrors({ ...errors, password: "Passwords don't match" });
      return;
    }

    // Here you would typically make an API call to update credentials
    console.log("Updating credentials:", account);
    setSuccessMessage("Credentials updated successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="py-20">
      <div className="card bg-base-100 w-full border-solid border-2 grid grid-cols-1 md:grid-cols-3">
        <div className="p-6 md:border-r-2">
          <h2 className="font-semibold text-slate-500">Account management</h2>

          {/* Image Profile Upload */}
          <div>
            <img
              src={profileImage}
              alt="profile_Img"
              className="rounded-xl border-2 w-[600px] my-5"
            />

            <div className="bg-base-200 p-4 rounded-lg border-2">
              <input
                type="file"
                id="profile-upload"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="profile-upload"
                className="btn w-full p-2 border-2 rounded-lg border-gray-200 bg-white cursor-pointer text-center"
              >
                Upload Photo
              </label>
              {errors.image && (
                <p className="text-red-500 text-sm mt-2">{errors.image}</p>
              )}
            </div>
          </div>

          {/* Input Forms */}
          <div className="mt-5 flex flex-col gap-5">
            <div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold ml-5">
                    Username
                  </span>
                </div>
                <input
                  type="text"
                  name="username"
                  value={account.username}
                  onChange={handleAccountChange}
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold ml-5">
                    Password
                  </span>
                </div>
                <input
                  type="password"
                  name="password"
                  value={account.password}
                  onChange={handleAccountChange}
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold ml-5">
                    New Password
                  </span>
                </div>
                <input
                  type="password"
                  name="newPassword"
                  value={account.newPassword}
                  onChange={handleAccountChange}
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold ml-5">
                    Confirm Password
                  </span>
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={account.confirmPassword}
                  onChange={handleAccountChange}
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
              </label>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            <button
              onClick={handleCredentialsChange}
              className="btn w-full p-2 border-2 rounded-lg border-gray-200 bg-white"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Change Credentials"}
            </button>
          </div>
        </div>

        <div className="p-6 col-span-2">
          {successMessage && (
            <div className="alert alert-success mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{successMessage}</span>
            </div>
          )}

          {/* upper row */}
          <div>
            <h2 className="font-semibold text-slate-500">
              Profile Information
            </h2>

            {/* forms */}
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3 py-6">
              {/* fullname */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold ml-5">
                    Fullname
                  </span>
                </div>
                <input
                  type="text"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleProfileChange}
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm">{errors.fullName}</p>
                )}
              </label>

              {/* office */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold ml-5">
                    Office (required)
                  </span>
                </div>
                <input
                  type="text"
                  name="office"
                  value={profile.office}
                  onChange={handleProfileChange}
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
                {errors.office && (
                  <p className="text-red-500 text-sm">{errors.office}</p>
                )}
              </label>

              {/* Position */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold ml-5">
                    Position (required)
                  </span>
                </div>
                <input
                  type="text"
                  name="positionOnBoard"
                  value={profile.positionOnBoard}
                  onChange={handleProfileChange}
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
                {errors.positionOnBoard && (
                  <p className="text-red-500 text-sm">
                    {errors.positionOnBoard}
                  </p>
                )}
              </label>

              {/* Appointment Date */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold ml-5">
                    Date of Appointment (required)
                  </span>
                </div>
                <input
                  type="date"
                  name="dateOfAppointment"
                  value={profile.dateOfAppointment}
                  onChange={handleProfileChange}
                  className="input input-bordered w-full"
                />
                {errors.dateOfAppointment && (
                  <p className="text-red-500 text-sm">
                    {errors.dateOfAppointment}
                  </p>
                )}
              </label>

              {/* Term Duration */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold ml-5">
                    Term Duration (required)
                  </span>
                </div>
                <input
                  type="text"
                  name="durationOfTerm"
                  value={profile.durationOfTerm}
                  onChange={handleProfileChange}
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
                {errors.durationOfTerm && (
                  <p className="text-red-500 text-sm">
                    {errors.durationOfTerm}
                  </p>
                )}
              </label>

              {/* End of Term */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold ml-5">
                    End of Term (required)
                  </span>
                </div>
                <input
                  type="date"
                  name="expirationOfTerm"
                  value={profile.expirationOfTerm}
                  onChange={handleProfileChange}
                  className="input input-bordered w-full"
                />
                {errors.expirationOfTerm && (
                  <p className="text-red-500 text-sm">
                    {errors.expirationOfTerm}
                  </p>
                )}
              </label>
            </div>
          </div>

          {/* lower row */}
          <div>
            <h2 className="font-semibold text-slate-500">Contact Info</h2>

            {/* forms */}
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3 py-6">
              {/* Email */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold ml-5">
                    Email (required)
                  </span>
                </div>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </label>

              {/* Phone Number */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold ml-5">
                    Phone Number (required)
                  </span>
                </div>
                <input
                  type="text"
                  name="phoneNumber"
                  value={profile.phoneNumber}
                  onChange={handleProfileChange}
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
                )}
              </label>
            </div>

            {/* button save */}
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="btn w-full max-w-28"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
