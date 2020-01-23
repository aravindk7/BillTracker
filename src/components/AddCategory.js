import React, { useState } from "react";

export default () => {
  const [category, setCategory] = useState();

  const handleChange = e => setCategory(e.target.value);

  return (
    <form>
      <h1>Enter a category of bills</h1>
      <p>E.g. 'Electricity' or 'Gas' or 'Internet'</p>
      <input
        placeholder="Add Category"
        value={category}
        onChange={handleChange}
      />
      <button>Add</button>
    </form>
  );
};
