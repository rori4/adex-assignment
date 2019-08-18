import React from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
} from 'reactstrap';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../logo.svg';

export default class NavBar extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false,
		};
	}
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen,
		});
	}
	render() {
		return (
			<div>
				<Navbar color='light' light expand='md'>
					<NavbarBrand href='/'>
						<svg
							width={50}
							height={50}
							xmlns='http://www.w3.org/2000/svg'
							xmlnsXlink='http://www.w3.org/1999/xlink'
						>
							<image xlinkHref={logo} height={50} width={50} />
						</svg>
						<span className='logo'>MultiSig Wallets</span>
					</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className='ml-auto' navbar>
							<NavItem>
								<NavLink
									href='https://github.com/rori4/adex-assignment'
									className='h6'
								>
									<FontAwesomeIcon icon={faGithub} className='mr-2' />
                  GitHub
								</NavLink>
							</NavItem>
						</Nav>
					</Collapse>
				</Navbar>
			</div>
		);
	}
}
