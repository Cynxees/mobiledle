export default function ColorIndicator() {
  return (
    <div className="border-2 p-8 py-4 border-[#CB812D] rounded-md w-96">
      <h3>Color Indicator</h3>
      <div className="flex gap-5 justify-center mt-5">
        <span className="flex flex-col items-center">
          <div className="bg-green-600 w-8 h-8"></div>
          <p>Correct</p>
        </span>
        <span className="flex flex-col items-center">
          <div className="bg-red-700 w-8 h-8"></div>
          <p>Incorrect</p>
        </span>
        <span className="flex flex-col items-center">
          <div className="bg-orange-600 w-8 h-8"></div>
          <p>Partial</p>
        </span>
      </div>
    </div>
  );
}
