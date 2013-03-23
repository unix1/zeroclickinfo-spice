function ddg_spice_flash_version() 
{
  var flash = YAHOO.util.FlashDetect.installed ?
                  'Flash version: '
                      + YAHOO.util.FlashDetect.major + '.'
                      + YAHOO.util.FlashDetect.minor + '.'
                      + YAHOO.util.FlashDetect.revision
                  : 'Flash is not installed';

  nra(zc_data);
  Spice.render({
      data             : { 'flash' : flash },
      header1          : 'Your Flash Player version',
      template_normal  : 'flash_version',
  });
}
