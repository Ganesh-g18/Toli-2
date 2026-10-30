# Reviewed vehicle asset handoff

No GLB, GLTF, FBX or OBJ model is installed. The existing below-fold coded sedan is not a professionally authored imported asset and must not be relabeled as four classes or exported to bypass that requirement.

Required: four independently modeled SUV, Sedan, Coupe and Supercar assets, with documented commercial website embedding/redistribution rights. Preserve original source assets and license evidence beside any optimized runtime versions.

Acquisition slots and review metadata are centralized in `src/lib/vehicle-model/registry.ts`. All four currently have `asset-required` status. No selector or runtime loader is connected to these unavailable slots.

Inspect each real model's proportions, materials, hierarchy, scale, orientation, tire contact and camera before approving it. Record measured file/geometry/texture budgets and exact component paths; unsupported components must remain unmapped. The older sports-GT adapter requires movable assemblies and is not a universal four-class adapter.

The current website still uses its existing coded sedan below the fold. Hero and navbar remain independent artwork. See `docs/FOUR-VEHICLE-ASSET-AUDIT.md` for the current audit and integration gate, and `docs/VEHICLE-MODEL.md` for the older adapter contract.
