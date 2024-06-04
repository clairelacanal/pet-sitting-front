function FormAnnonce({ handleSubmit, handleChange }) {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="city">
        Ville
        <input type="text" name="city" id="city" onChange={handleChange} />
      </label>
      <label htmlFor="description">
        Description
        <textarea
          name="description"
          id="description"
          onChange={handleChange}
        ></textarea>
      </label>
      <label htmlFor="startDate">
        Date de début
        <input
          type="datetime-local"
          name="startDate"
          id="startDate"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="endDate">
        Date de fin
        <input
          type="datetime-local"
          name="endDate"
          id="endDate"
          onChange={handleChange}
        />
      </label>
      <input type="submit" value="Valider" />
    </form>
  );
}

export default FormAnnonce;
