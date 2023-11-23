import React from 'react';

import FileResource from './FileResource';

function ManageTopmost() {
    const [action, setAction] = React.useState('resource');
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const actionParam = params.get('action');
        if (actionParam) {
           setAction(actionParam);
            
        }
        setLoading(false);
    }, []);

    if (loading) {
        <div>Loading...</div>
    }

    if (action === 'resource') {
        return (
            <div>
                <FileResource />
            </div>
        );
    } else {
        return (<div>
            NOTHING
        </div>);
    }
}

export default ManageTopmost;