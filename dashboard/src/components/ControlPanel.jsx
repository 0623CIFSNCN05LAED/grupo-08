import "./ControlPanel.css";
import Users from "./Content/Users";

export default function ControlPanel() {
  return (
    <section className='section'>
      <h3> Panel de control del Admin</h3>

      <Users />
    </section>
  );
}