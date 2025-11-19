import React, { useState, useEffect, type JSX } from "react";

interface ModalNewProjectProps {
  show: boolean;
  onClose: () => void;
  onCreate: (project: { name: string; description: string }) => void;
}

/**
 * ModalNewProject allows users to create a new project in a modal dialog.
 *
 * @component
 * @param {ModalNewProjectProps} props - The props for the ModalNewProject component.
 * @returns {JSX.Element|null} The rendered new project modal or null if not visible.
 */
const ModalNewProject: React.FC<ModalNewProjectProps> = ({
  show,
  onClose,
  onCreate,
}: ModalNewProjectProps): JSX.Element | null => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // Reset form fields when the modal is shown
  useEffect(() => {
    if (show) {
      setName("");
      setDescription("");
    }
  }, [show]);

  // Handle the "Create" action for the project
  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "") return;
    onCreate({ name, description });
    onClose();
  };

  if (!show) return null;

  return (
    <div
      className="uk-modal uk-open uk-flex uk-flex-middle uk-flex-center"
      style={{ display: "block" }}
    >
      <div className="uk-modal-dialog uk-modal-body uk-border-rounded">
        <button
          className="uk-modal-close-default"
          type="button"
          data-uk-close=""
          aria-label="Close"
          onClick={onClose}
          style={{ right: 10, top: 10, position: "absolute" }}
        />
        <h3 className="uk-modal-title">New Project</h3>
        <form onSubmit={handleCreate}>
          <div className="uk-margin">
            <label className="uk-form-label">Project Name</label>
            <div className="uk-form-controls">
              <input
                className="uk-input"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                placeholder="Enter project name"
              />
            </div>
          </div>
          <div className="uk-margin">
            <label className="uk-form-label">Description</label>
            <div className="uk-form-controls">
              <textarea
                className="uk-textarea"
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
                placeholder="A short description of the project"
              />
            </div>
          </div>
          <div className="uk-flex uk-flex-right">
            <button
              className="uk-button uk-button-default uk-modal-close"
              type="button"
              onClick={onClose}
              style={{ marginRight: "8px" }}
            >
              Cancel
            </button>
            <button
              className="uk-button uk-flex uk-flex-middle uk-background-secondary"
              style={{ color: "#fff" }}
              type="submit"
              disabled={name.trim() === ""}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalNewProject;
