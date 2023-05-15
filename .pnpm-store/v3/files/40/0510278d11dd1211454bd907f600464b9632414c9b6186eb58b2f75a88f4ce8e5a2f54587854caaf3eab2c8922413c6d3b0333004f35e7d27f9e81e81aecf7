import { identity } from './function';
export function splitChoice(F) {
    return function (pab, pcd) { return F.compose(F.left(pab), F.right(pcd)); };
}
export function fanin(F) {
    var splitChoiceF = splitChoice(F);
    return function (pac, pbc) {
        var join = F.promap(F.id(), function (e) { return (e._tag === 'Left' ? e.left : e.right); }, identity);
        return F.compose(join, splitChoiceF(pac, pbc));
    };
}
