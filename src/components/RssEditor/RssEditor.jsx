import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddRssForm from '../AddRssForm/AddRssForm';
import EditRssForm from '../EditRssForm/EditRssForm';
import getRss from '../../store/API/RssApi';

const RssEditor = () => {
    const { addInfo, editInfo, sources } = useSelector(state => state.rss);
    const dispatcher = useDispatch();

    // eslint-disable-next-line
    useEffect(() => { dispatcher(getRss()) }, [])

    return (
        <div>
            <AddRssForm info={addInfo} />
            {
                sources.length !== 0 || editInfo
                    ?
                    <EditRssForm info={editInfo} sources={sources} />
                    :
                    <div></div>
            }
        </div>
    );
}

export default RssEditor;