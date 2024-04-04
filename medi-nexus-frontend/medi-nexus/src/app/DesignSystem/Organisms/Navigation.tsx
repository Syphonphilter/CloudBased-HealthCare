'use client'
import React, { useState } from 'react';
import { Button, Drawer, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { IconDefinition, faBars, faTable, faPhoneVolume, faCalculator, faChartBar, faChildren, faDashboard, faFingerprint, faHeadset, faMailBulk, faMoneyBillTransfer, faPerson, faPersonCane, faClipboardList, faGear, faInbox, faMessage, faEarthAfrica, faEllipsis, faGrip } from '@fortawesome/free-solid-svg-icons';
import { Colors } from '../DesignTokens/Colors';
import { Labels } from '../DesignTokens/Labels';
import AppIcon from '../Atoms/AppIcon/AppIcon';
import NavigationMenuItem from '../Molecules/NavigationMenuItem';
import { DashboardMenuItemData } from '@/app/Utils/AppContentData';
import { CAccordion, CAccordionItem, CAccordionHeader, CAccordionBody } from '@coreui/react';
import { Borders } from '../DesignTokens/Borders';

const Navigation: React.FC<{ onUpdate: (currentDashboard: string) => void }> = (props) => {
  const svgIcon = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" fill="#037668" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>`);
  const accordionStyles = {
    '--bs-accordion-color': '#34495e',
    '--bs-accordion-bg': Colors.itemBackground,
    '--bs-accordion-active-bg': Colors.itemHover,
    '--bs-accordion-active-color':'trasparent',
    '--bs-accordion-border-color': 'transparent',
    '--bs-accordion-border-radius':Borders.input_border_large,
    '--bs-accordion-btn-focus-box-shadow': '0 0 0 0.0rem rgba(0, 0, 0, 0)',
    '--bs-accordion-btn-icon': `url("data:image/svg+xml,${svgIcon}")`,
    '--bs-accordion-btn-active-icon': `url("data:image/svg+xml,${svgIcon}")`,
    } as React.CSSProperties & Record<string, string>;
  const [mobileOpen, setMobileOpen] = useState(false);
  const iconsMap: Record<string, IconDefinition> = {
    faInbox,
    faMessage,
    faClipboardList,
    faFingerprint,
    faChartBar,
    faGrip,
    faEarthAfrica,
    faTable,
    faGear
    // Add more icons as needed
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const mobileMenuItems = DashboardMenuItemData.map((item: { item: string; icon: string }) => {
    const { item: itemName, icon: iconAlias } = item;
    const icon = iconsMap[iconAlias];
    return (
      <NavigationMenuItem
        key={itemName}
        label={itemName}
        icon={icon}
        color={Colors.absoluteWhite}
        onClick={() => { handleDrawerToggle(); props.onUpdate(itemName); }}
      />
    );
  });

  const desktopMenuItems = DashboardMenuItemData.map((item: { item: string; icon: string }) => {
    const { item: itemName, icon: iconAlias } = item;
    const icon = iconsMap[iconAlias];
    return (
      <NavigationMenuItem
        key={itemName}
        label={itemName}
        icon={icon}
        color={Colors.absoluteWhite}
        onClick={() => props.onUpdate(itemName)}
      />
    );
  });

  return (
    <div>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr:2,ml:2, display: { sm: 'none' } ,backgroundColor:Colors.itemBackground}} 
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 270,paddingTop:10,backgroundColor:Colors.itemBackground, borderBottomRightRadius:20,borderTopRightRadius:20, }
        }}
      >
        <Box
          sx={{ width: 250,backgroundColor:Colors.itemBackground,}}
          role="presentation"
        >
          {mobileMenuItems}
        </Box>
      </Drawer>
      <Box sx={{ display: { xs: 'none', sm: 'block' }, }}>
        {/* Navigation items for non-mobile view */}
        <CAccordion className='mb-2' style={accordionStyles} activeItemKey={1}>
      <CAccordionItem  itemKey={1}>
          <CAccordionHeader>
            <div className='flex justify-start'>
              <Button sx={{ color: Colors.absoluteWhite, fontFamily: Labels.font_family }}>
                <AppIcon className='h-8 w-8' size='2x' icon={faBars} color={Colors.primary} />
                <div className='flex items-center  pl-5 pr-5' >Patient Menu</div>
              </Button>
            </div>
          </CAccordionHeader>
          <CAccordionBody>
            {DashboardMenuItemData.map((item: { item: string; icon: string }) => {
              const { item: itemName, icon: iconAlias } = item;
              const icon = iconsMap[iconAlias];
              return icon && <NavigationMenuItem onClick={() => props.onUpdate(itemName)} label={itemName} icon={icon} color={Colors.absoluteWhite} />;
            })}
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
      </Box>
    </div>
  );
};

export default Navigation;

