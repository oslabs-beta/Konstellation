import electronInstaller from 'electron-winstaller'

const installer = (async () => {
  try {
    await electronInstaller.createWindowsInstaller({
      appDirectory: '/tmp/build/my-app-64',
      outputDirectory: '/tmp/build/installer64',
      authors: 'My App Inc.',
      exe: 'myapp.exe'
    });
    console.log('It worked!');
  } catch (e) {
    console.log(`No dice: ${e.message}`);
  }
})()