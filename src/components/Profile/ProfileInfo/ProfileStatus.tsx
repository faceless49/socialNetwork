import { ChangeEvent, Component } from "react";

export class ProfileStatus extends Component<any> {
  state = {
    editMode: false,
    status: this.props.status,
  };
  activateEditMode = () => {
    this.setState({
      editMode: true,
    });
  };
  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    });
    this.props.updateStatus(this.state.status);
  };

  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.currentTarget.value,
    });
  };
  render() {
    return (
      <>
        {!this.state.editMode ? (
          <div>
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status || "----"}
            </span>
          </div>
        ) : (
          <div>
            <input
              onBlur={this.deactivateEditMode}
              autoFocus
              value={this.state.status}
              onChange={this.onStatusChange}
            />
          </div>
        )}
      </>
    );
  }
}