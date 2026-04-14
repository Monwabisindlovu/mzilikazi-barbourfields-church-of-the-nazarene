export default function UserNotRegisteredError() {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-red-600">User not registered</h1>
      <p className="mt-2 text-gray-600">
        Please contact the administrator to register your account.
      </p>
    </div>
  );
}
