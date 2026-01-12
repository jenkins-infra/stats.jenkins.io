/**
 * Jenkins IO Components Initialization
 *
 * This file handles the initialization of @jenkinsci/jenkins-io-components
 * web components by importing them from the bundled npm package instead of
 * relying on external CDN scripts. This ensures:
 * - Offline development capability
 * - Resilience against CDN outages
 * - Version consistency with package.json dependencies
 * - Faster local development builds
 */

// Import the Jenkins IO components library
// This registers the custom elements (jio-navbar, jio-footer, etc.) globally
import '@jenkinsci/jenkins-io-components'

// Flag to track initialization status
let isInitialized = false

/**
 * Initializes the Jenkins IO components.
 * This function is idempotent - multiple calls will not re-initialize.
 *
 * @returns Promise<boolean> - resolves to true if initialization was successful
 */
export async function initJenkinsIOComponents(): Promise<boolean> {
    if (isInitialized) {
        return true
    }

    try {
        // Wait for custom elements to be defined
        // This ensures the components are ready to use before rendering
        await Promise.all([
            customElements.whenDefined('jio-navbar'),
            customElements.whenDefined('jio-footer'),
        ])

        isInitialized = true
        return true
    } catch (error) {
        console.warn(
            'Failed to initialize Jenkins IO components:',
            error instanceof Error ? error.message : error
        )
        return false
    }
}

/**
 * Checks if the Jenkins IO components are available.
 * Useful for conditional rendering of fallback UI.
 *
 * @returns boolean - true if components are available
 */
export function areJenkinsIOComponentsAvailable(): boolean {
    return isInitialized
}
