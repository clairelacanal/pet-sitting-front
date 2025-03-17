import './Form.css'
import '../../App.css'

function FormAnnonce({ handleSubmit, handleChange, formData, title }) {
  return (
    <div>
      <div className="container-formulaire">
      <h3>{title}</h3>
<form onSubmit={handleSubmit} className="form">
      <label htmlFor="city">
        Ville
        <input
          type="text"
          name="city"
          id="city"
          value={formData.city}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="description">
        Description
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </label>
      <label htmlFor="startDate">
        Date de début
        <input
          type="datetime-local"
          name="startDate"
          id="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="endDate">
        Date de fin
        <input
          type="datetime-local"
          name="endDate"
          id="endDate"
          value={formData.endDate}
          onChange={handleChange}
        />
      </label>
      <input type="submit" value="Valider" />
    </form>
    </div>
    </div>
  );
}

export default FormAnnonce;
