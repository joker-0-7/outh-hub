function Button({ mode, handleModeChange }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex justify-center">
        <input
          type="radio"
          id="examMode"
          name="mode"
          value="Exam"
          checked={mode === "Exam"}
          onChange={handleModeChange}
          className="sr-only"
        />
        <label
          htmlFor="examMode"
          className={`btn btn-primary ${
            mode === "Exam" ? "active" : ""
          } py-3 px-5 rounded-md`}
        >
          Exam Mode
        </label>

        <input
          type="radio"
          id="testMode"
          name="mode"
          value="Tutor"
          checked={mode === "Tutor"}
          onChange={handleModeChange}
          className="sr-only"
        />
        <label
          htmlFor="testMode"
          className={`btn btn-primary ${
            mode === "Tutor" ? "active" : ""
          } py-3 px-5 rounded-md`}
        >
          Tutor Mode
        </label>
      </div>

      <p className="mt-2">Selected mode: {mode}</p>
    </div>
  );
}

export default Button;
