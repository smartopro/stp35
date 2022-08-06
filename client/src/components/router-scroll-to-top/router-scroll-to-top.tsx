import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

interface IProps {
    history: any
}

function RouterScrollToTop({ history}: IProps) {
    useEffect(() => {
        const removeListener = history.listen(() => {
            window.scrollTo(0, 0);
        });
        return () => {
            removeListener();
        }
    }, []);

    return null;
}

export default withRouter(RouterScrollToTop);
