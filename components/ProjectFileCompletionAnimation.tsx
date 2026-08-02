"use client";

import { useEffect } from "react";

export type ProjectFileCompletion = {
  id: number;
  documentTitle: string;
  fileName: string;
  projectReference: string;
  completedCount: number;
  totalCount: number;
};

export default function ProjectFileCompletionAnimation({
  completion,
  onDismiss,
}: {
  completion: ProjectFileCompletion;
  onDismiss: () => void;
}) {
  useEffect(() => {
    const timer = window.setTimeout(onDismiss, 4200);
    return () => window.clearTimeout(timer);
  }, [completion.id, onDismiss]);

  return (
    <div className="portal-completion-backdrop" role="status" aria-live="polite">
      <section className="portal-completion-card" aria-label={`${completion.documentTitle} completed and saved`}>
        <span className="portal-completion-eyebrow">Document completed</span>
        <h3>Filed securely in your project</h3>
        <p>{completion.documentTitle}</p>

        <div className="portal-file-scene" aria-hidden="true">
          <div className="portal-filing-paper">
            <div className="portal-paper-brand"><span>FLLM</span><small>PROJECT DOCUMENT</small></div>
            <strong>{completion.documentTitle}</strong>
            <small>{completion.fileName}</small>
            <i /><i /><i /><i />
            <em>COMPLETE</em>
          </div>
          <div className="portal-project-file">
            <div className="portal-file-slot" />
            <div className="portal-file-label">
              <span>PROJECT FILE</span>
              <strong>{completion.projectReference}</strong>
              <small>{completion.completedCount} of {completion.totalCount} items complete</small>
            </div>
          </div>
        </div>

        <div className="portal-completion-confirmation">
          <span aria-hidden="true">✓</span>
          <p><strong>Saved and recorded</strong>The checklist and project history have been updated.</p>
        </div>
        <button type="button" onClick={onDismiss}>Continue to project</button>
      </section>
    </div>
  );
}
