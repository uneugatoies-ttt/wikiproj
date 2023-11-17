import React from 'react';
import WikiDrafts from './WikiDrafts';

/* TODO
    -> Check whether the accessing users have authorization or not;
    if they haven't got any, inform the users that they are forbidden
    from accessing these resources.

    -> Actually, the above should apply to every resources other than
    those that are disclosed to the users.
*/

function AdminTopmost() {
    const [action, setAction] = React.useState('authorize-wd');

    React.useEffect(() => {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        const actionParam = params.get('action');
        if (actionParam) {
            setAction(actionParam);
        }
    }, [])

    if (action === 'authorize-wd') {
        return (
            <div>
                <WikiDrafts />
            </div>
        );    
    } else {
        return (
            <div>
                UNRECOGNIZED TASK
            </div>
        );
    } 
}

export default AdminTopmost;