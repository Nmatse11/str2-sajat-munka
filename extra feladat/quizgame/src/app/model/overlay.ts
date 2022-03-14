import { OverlayRef } from "@angular/cdk/overlay";

export class OverlayModel {

  constructor(private overlayRef: OverlayRef) { }

  close(): void {
    this.overlayRef.detach();
  }
}
