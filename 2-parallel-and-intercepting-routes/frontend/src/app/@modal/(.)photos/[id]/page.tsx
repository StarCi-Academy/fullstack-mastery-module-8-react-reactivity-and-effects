"use client"
import { useRouter } from "next/navigation"
import { use } from "react"
import { Modal, Button, useOverlayState } from "@heroui/react"

/**
 * Intercepting route `(.)photos/[id]` — intercepts navigation from "/" to
 * "/photos/[id]" and renders a modal into the @modal slot instead of a full-page nav.
 *
 * Close button calls router.back() so Next.js pops history and disposes the @modal
 * slot. Link href="/" does NOT close it because Next.js treats that as a new nav and
 * keeps the slot mounted.
 */
export default function PhotoModalPage({
    params,
}: {
    params: Promise<{ id: string }>
}): JSX.Element {
    const { id } = use(params)
    const router = useRouter()
    const state = useOverlayState({ defaultOpen: true })

    const close = (): void => {
        state.close()
        // Pop history to dispose slot
        router.back()
    }

    return (
        <Modal state={state}>
            <Modal.Backdrop>
                <Modal.Container placement="center">
                    <Modal.Dialog>
                        <div data-testid="photo-modal" className="rounded-large bg-background p-6 shadow-large min-w-[320px]">
                            <Modal.Header>
                                <h2 data-testid="modal-title" className="text-xl font-semibold">Photo {id} — modal</h2>
                            </Modal.Header>
                            <Modal.Body>
                                <p data-testid="modal-marker" className="text-default-700">Rendered via intercepting route.</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button data-testid="modal-close" type="button" variant="primary" onPress={close}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </div>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
}
