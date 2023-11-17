import React from 'react';


function WikidraftTopmost() {
    const [action, setAction] = React.useState('create-draft');

    let search = window.location.search;
    let params = new URLSearchParams(search);

    React.useEffect(() => {
        if (!params.get('task')) {
            const actionParam = params.get('task');
            if (actionParam) {
                setAction(actionParam);
            }
        }
    }, [])

    if (action === 'create-draft') {
        return (
            <div>
                wikidraft
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

export default WikidraftTopmost;