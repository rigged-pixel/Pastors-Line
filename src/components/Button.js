export default function Button(props) {
  const border = {};
  if (props.border != undefined) {
    border.borderColor = props.border;
    border.borderWidth = 1;
    border.style = "solid";
    border.color = "black";
  }
  return (
    <a
      className="btn btn-primary m-auto"
      href={`#${props.redirect || ""}`}
      role="button"
      onClick={props.onClick}
      style={{ backgroundColor: props.color || "", ...border }}
    >
      {props.children}
    </a>
  );
}
