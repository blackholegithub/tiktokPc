import classNames from 'classnames/bind'
import styles from './NewLayout.module.scss'
import PropTypes from 'prop-types'
import ModalForm from '~/components/ModalForm'
import { ModalContext } from '~/components/ModalProvider'
import { useContext } from 'react'



const cx = classNames.bind(styles)

function NewLayout({ children }) {
    const context = useContext(ModalContext)

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {children}
            </div>
            {context.active && <ModalForm onHide={context.handleHideModal} />}
        </div>

    )
}

NewLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default NewLayout