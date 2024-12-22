export const Checkbox = ({ id, label, checked, onChange }) => (
    <div className="form-check">
      <input type="checkbox" id={id} className="form-check-input" checked={checked} onChange={onChange} />
      <label htmlFor={id} className="form-check-label">{label}</label>
    </div>
  );
  