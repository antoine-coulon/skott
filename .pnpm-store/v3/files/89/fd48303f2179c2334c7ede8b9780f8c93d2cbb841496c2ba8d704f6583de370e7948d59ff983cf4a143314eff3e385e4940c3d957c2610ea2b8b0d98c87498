/**
 * A `BoundedDistributiveLattice` is a lattice that is both bounded and distributive
 *
 * @since 2.0.0
 */
import { BoundedLattice } from './BoundedLattice'
import { DistributiveLattice } from './DistributiveLattice'
import { Ord } from './Ord'
/**
 * @since 2.0.0
 */
export interface BoundedDistributiveLattice<A> extends BoundedLattice<A>, DistributiveLattice<A> {}
/**
 * @since 2.0.0
 */
export declare function getMinMaxBoundedDistributiveLattice<A>(
  O: Ord<A>
): (min: A, max: A) => BoundedDistributiveLattice<A>
