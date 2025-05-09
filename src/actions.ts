import type { ModuleInstance } from './main.js'

export function UpdateActions(self: ModuleInstance): void {
	self.setActionDefinitions({
		configure_aes_io: {
			name: 'Configure AES IO Ports',
			options: [
				// AES1
				{ id: 'aes1_group', type: 'number', label: 'AES1 Group', default: 1, min: 1, max: 8 },
				{ id: 'aes1_pair', type: 'number', label: 'AES1 Pair', default: 1, min: 1, max: 2 },
				{ id: 'aes1_mode', type: 'textinput', label: 'AES1 Mode', default: '' },
				{ id: 'aes1_transmitSource', type: 'textinput', label: 'AES1 Transmit Source', default: '' },

				// AES2
				{ id: 'aes2_group', type: 'number', label: 'AES2 Group', default: 1, min: 1, max: 8 },
				{ id: 'aes2_pair', type: 'number', label: 'AES2 Pair', default: 1, min: 1, max: 2 },
				{ id: 'aes2_mode', type: 'textinput', label: 'AES2 Mode', default: '' },
				{ id: 'aes2_transmitSource', type: 'textinput', label: 'AES2 Transmit Source', default: '' },

				// AES3
				{ id: 'aes3_group', type: 'number', label: 'AES3 Group', default: 1, min: 1, max: 8 },
				{ id: 'aes3_pair', type: 'number', label: 'AES3 Pair', default: 1, min: 1, max: 2 },
				{ id: 'aes3_mode', type: 'textinput', label: 'AES3 Mode', default: '' },
				{ id: 'aes3_transmitSource', type: 'textinput', label: 'AES3 Transmit Source', default: '' },

				// AES4
				{ id: 'aes4_group', type: 'number', label: 'AES4 Group', default: 1, min: 1, max: 8 },
				{ id: 'aes4_pair', type: 'number', label: 'AES4 Pair', default: 1, min: 1, max: 2 },
				{ id: 'aes4_mode', type: 'textinput', label: 'AES4 Mode', default: '' },
				{ id: 'aes4_transmitSource', type: 'textinput', label: 'AES4 Transmit Source', default: '' },

				// Passthrough
				{
					id: 'passthroughSource',
					type: 'dropdown',
					label: 'Passthrough Source',
					default: 'aes1',
					choices: [
						{ id: 'aes1', label: 'AES 1' },
						{ id: 'aes2', label: 'AES 2' },
						{ id: 'aes3', label: 'AES 3' },
						{ id: 'aes4', label: 'AES 4' },
					],
				},
			],
			callback: async (event) => {
				const o = event.options

				const payload = {
					aes1: {
						group: o.aes1_group,
						pair: o.aes1_pair,
						mode: o.aes1_mode,
						transmitSource: o.aes1_transmitSource,
					},
					aes2: {
						group: o.aes2_group,
						pair: o.aes2_pair,
						mode: o.aes2_mode,
						transmitSource: o.aes2_transmitSource,
					},
					aes3: {
						group: o.aes3_group,
						pair: o.aes3_pair,
						mode: o.aes3_mode,
						transmitSource: o.aes3_transmitSource,
					},
					aes4: {
						group: o.aes4_group,
						pair: o.aes4_pair,
						mode: o.aes4_mode,
						transmitSource: o.aes4_transmitSource,
					},
					passthroughSource: o.passthroughSource,
				}

				await self.apiPut('/aesIO/config', payload)
			},
		},

		analyser_ancillaryInspector: {
			name: 'Set Ancillary Inspector Config',
			options: [
				{ id: 'did', type: 'number', label: 'DID', default: 0, min: 0, max: 999999 },
				{ id: 'firstLine', type: 'number', label: 'First Line', default: 0, min: -999999, max: 9999999 },
				{
					id: 'hancVancSelect',
					type: 'dropdown',
					label: 'HANC/VANC Select',
					choices: ['both', 'hanc', 'vanc'].map((x) => ({ id: x, label: x })),
					default: 'both',
				},

				{
					id: 'identifierSelect',
					type: 'dropdown',
					label: 'Identifier Select',
					choices: ['any', 'custom'].map((x) => ({ id: x, label: x })),
					default: 'any',
				},
				{ id: 'lastLine', type: 'number', label: 'Last Line', default: 0, min: -999999, max: 9999999 },
				{
					id: 'rangeSelect',
					type: 'dropdown',
					label: 'Range Select',
					choices: ['any', 'inside', 'outside'].map((x) => ({ id: x, label: x })),
					default: 'any',
				},

				{ id: 'sdid', type: 'number', label: 'SDID', default: 0, min: 0, max: 999999 },
				{ id: 'searchAncGapErrors', type: 'checkbox', label: 'Search Ancillary Gap Errors', default: false },
				{ id: 'searchChecksumErrors', type: 'checkbox', label: 'Search Checksum Errors', default: false },
				{ id: 'searchDBNErrors', type: 'checkbox', label: 'Search DBN Errors', default: false },
				{ id: 'searchParityErrors', type: 'checkbox', label: 'Search Parity Errors', default: false },

				{
					id: 'subImageSearch',
					type: 'dropdown',
					label: 'SubImage Search',
					choices: [
						'any',
						'subImage1',
						'subImage2',
						'subImage3',
						'subImage4',
						'linkBSubImage1',
						'linkBSubImage2',
						'linkBSubImage3',
						'linkBSubImage4',
					].map((x) => ({ id: x, label: x })),
					default: 'any',
				},
				{
					id: 'yPosCPosSelect',
					type: 'dropdown',
					label: 'YPos/CPos Select',
					choices: ['both', 'yPos', 'cPos'].map((x) => ({ id: x, label: x })),
					default: 'both',
				},
				{ id: 'triggerOnlyOnErrors', type: 'checkbox', label: 'Trigger Only On Errors', default: false },
			],
			callback: async (event) => {
				await self.apiPut('/analyser/ancillaryInspector', {
					identifierSelect: event.options.identifierSelect,
					did: event.options.did,
					sdid: event.options.sdid,
					subImageSearch: event.options.subImageSearch,
					rangeSelect: event.options.rangeSelect,
					firstLine: event.options.firstLine,
					lastLine: event.options.lastLine,
					hancVancSelect: event.options.hancVancSelect,
					yPosCPosSelect: event.options.yPosCPosSelect,
					triggerOnlyOnErrors: event.options.triggerOnlyOnErrors,
					searchChecksumErrors: event.options.searchChecksumErrors,
					searchDBNErrors: event.options.searchDBNErrors,
					searchParityErrors: event.options.searchParityErrors,
					searchAncGapErrors: event.options.searchAncGapErrors,
				})
			},
		},

		analyser_ancillaryStatus_reset: {
			name: 'Reset Ancillary Status',
			options: [{ id: 'reset', type: 'checkbox', label: 'Reset', default: true }],
			callback: async (event) => {
				await self.apiPut('/analyser/ancillaryStatus', {
					reset: event.options.reset,
				})
			},
		},

		analyser_audioMeter_ballistics: {
			name: 'Set Audio Meter Ballistics',
			options: [
				{
					id: 'ballistics',
					type: 'dropdown',
					label: 'Ballistics',
					choices: ['PPM Type I', 'PPM Type II', 'Vu', 'VuFr', 'Fast'].map((x) => ({ id: x, label: x })),
					default: 'PPM Type I',
				},
			],
			callback: async (event) => {
				await self.apiPut('/analyser/audioMeter', {
					ballistics: event.options.ballistics,
				})
			},
		},

		analyser_cableLength_set: {
			name: 'Set Cable Type',
			options: [
				{
					id: 'cableType',
					type: 'dropdown',
					label: 'Cable Type',
					choices: ['belden_8281', 'belden_1505', 'belden_1694a', 'belden_1855a', 'canare_l5cfb', 'image_1000'].map(
						(x) => ({ id: x, label: x }),
					),
					default: 'belden_1694a',
				},
			],
			callback: async (event) => {
				await self.apiPut('/analyser/cableLength', {
					cableType: event.options.cableType,
				})
			},
		},

		analyser_crcSummary_set: {
			name: 'Set CRC Summary Action',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					choices: ['reset'].map((x) => ({ id: x, label: x })),
					default: 'reset',
				},
				{
					id: 'ignoreCrcOnSwitchLines',
					type: 'dropdown',
					label: 'Ignore CRC On Switch Lines',
					choices: ['enable', 'disable'].map((x) => ({ id: x, label: x })),
					default: 'enable',
				},
			],
			callback: async (event) => {
				await self.apiPut('/analyser/crcSummary', {
					action: event.options.action,
					ignoreCrcOnSwitchLines: event.options.ignoreCrcOnSwitchLines,
				})
			},
		},

		analyser_cursor_position: {
			name: 'Set Active Picture Cursor',
			options: [
				{ id: 'activePictureLine', type: 'number', label: 'Line', default: 0, min: -39, max: 1084 },
				{ id: 'activePicturePixel', type: 'number', label: 'Pixel', default: 0, min: 0, max: 2147483647 },
			],
			callback: async (event) => {
				await self.apiPut('/analyser/cursors/activePictureCursor', {
					activePictureLine: event.options.activePictureLine,
					activePicturePixel: event.options.activePicturePixel,
				})
			},
		},
		analyser_loudness_config: {
			name: 'Loudness Config',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					default: 'loudnessMonitoringReset',
					choices: [
						{ id: 'loudnessMonitoringReset', label: 'Loudness Monitoring Reset' },
						{ id: 'truePeakValueReset', label: 'True Peak Value Reset' },
						{ id: 'errorCountsReset', label: 'Error Counts Reset' },
					],
				},
				{
					id: 'audioMode',
					type: 'dropdown',
					label: 'Audio Mode',
					default: 'stereo',
					choices: [
						{ id: 'stereo', label: 'Stereo' },
						{ id: '5.1', label: '5.1' },
						{ id: 'aesStereo', label: 'AES Stereo' },
						{ id: 'aes5.1', label: 'AES 5.1' },
						{ id: 'dolbyDecoder1', label: 'Dolby Decoder 1' },
					],
				},
				{
					id: 'standard',
					type: 'dropdown',
					label: 'Standard',
					default: 'ebuLufs',
					choices: [
						{ id: 'ebuLufs', label: 'EBU LUFS' },
						{ id: 'ebuLu', label: 'EBU LU' },
						{ id: 'ituLkfs', label: 'ITU LKFS' },
						{ id: 'ituLu', label: 'ITU LU' },
					],
				},
				{ id: 'truePeakAlarm', type: 'number', label: 'True Peak Alarm (dB)', default: -1, min: -99, max: 0 },
				{
					id: 'logDuration_mins',
					type: 'dropdown',
					label: 'Log Duration (min)',
					default: 60,
					choices: [5, 15, 30, 60, 120, 180, 360, 720, 1440].map((x) => ({ id: x, label: x.toString() })),
				},
				{
					id: 'logLifetime_days',
					type: 'dropdown',
					label: 'Log Lifetime (days)',
					default: 7,
					choices: [1, 7, 14, 30].map((x) => ({ id: x, label: x.toString() })),
				},
				{ id: 'logFilename', type: 'textinput', label: 'Log Filename', default: 'string-value' },
				{
					id: 'control',
					type: 'dropdown',
					label: 'Control',
					default: 'start',
					choices: ['start', 'stop', 'pause'].map((x) => ({ id: x, label: x })),
				},
				{ id: 'meterTarget_integrated', type: 'number', label: 'Target Integrated', default: -23, min: -59, max: -5 },
				{ id: 'meterTarget_momentary', type: 'number', label: 'Target Momentary', default: -20, min: -59, max: -5 },
				{ id: 'meterTarget_shortTerm', type: 'number', label: 'Target Short Term', default: -20, min: -59, max: -5 },
				{
					id: 'meterTolerance_momentary',
					type: 'number',
					label: 'Tolerance Momentary',
					default: -3,
					min: -59,
					max: -5,
				},
			],
			callback: async (event) => {
				const o = event.options
				const payload = {
					action: o.action,
					audioAssignment: {
						audioMode: o.audioMode,
					},
					standard: o.standard,
					truePeakAlarm: o.truePeakAlarm,
					logDuration_mins: o.logDuration_mins,
					logLifetime_days: o.logLifetime_days,
					logFilename: o.logFilename,
					control: o.control,
					meterTarget: {
						integrated: o.meterTarget_integrated,
						momentary: o.meterTarget_momentary,
						shortTerm: o.meterTarget_shortTerm,
					},
					meterTolerance: {
						momentary: o.meterTolerance_momentary,
					},
				}
				await self.apiPut('/analyser/loudness/config', payload)
			},
		},

		override_video_standard_config: {
			name: 'Override Video Standard Config',
			options: [
				{ id: 'manualOverrideEnabled', type: 'checkbox', label: 'Manual Override Enabled', default: false },

				{
					id: 'format',
					type: 'dropdown',
					label: 'Format',
					default: 'YCbCr:422:10',
					choices: [
						{ id: 'YCbCr:422:10', label: 'YCbCr:422:10' },
						{ id: 'YCbCr:422:12', label: 'YCbCr:422:12' },
						{ id: 'YCbCrA:4224:12', label: 'YCbCrA:4224:12' },
						{ id: 'YCbCr:444:10', label: 'YCbCr:444:10' },
						{ id: 'YCbCr:444:12', label: 'YCbCr:444:12' },
						{ id: 'YCbCrA:4444:10', label: 'YCbCrA:4444:10' },
						{ id: 'RGB:444:10', label: 'RGB:444:10' },
						{ id: 'RGB:444:12', label: 'RGB:444:12' },
						{ id: 'RGBA:4444:10', label: 'RGBA:4444:10' },
					],
				},
				{
					id: 'frame',
					type: 'dropdown',
					label: 'Frame Rate',
					default: '50i',
					choices: [
						{ id: '23.98p', label: '23.98p' },
						{ id: '23.98psf', label: '23.98psf' },
						{ id: '24p', label: '24p' },
						{ id: '24psf', label: '24psf' },
						{ id: '25p', label: '25p' },
						{ id: '25psf', label: '25psf' },
						{ id: '29.97p', label: '29.97p' },
						{ id: '29.97psf', label: '29.97psf' },
						{ id: '30p', label: '30p' },
						{ id: '30psf', label: '30psf' },
						{ id: '47.95p', label: '47.95p' },
						{ id: '48p', label: '48p' },
						{ id: '50i', label: '50i' },
						{ id: '50p', label: '50p' },
						{ id: '59.94i', label: '59.94i' },
						{ id: '59.94p', label: '59.94p' },
						{ id: '60i', label: '60i' },
						{ id: '60p', label: '60p' },
					],
				},
				{
					id: 'gamut',
					type: 'dropdown',
					label: 'Gamut',
					default: '709',
					choices: [
						{ id: '709', label: '709' },
						{ id: '2020', label: '2020' },
						{ id: 'HLG 2020', label: 'HLG 2020' },
						{ id: 'PQ 2020', label: 'PQ 2020' },
						{ id: 'S-Log3 2020', label: 'S-Log3 2020' },
					],
				},
				{
					id: 'type',
					type: 'dropdown',
					label: 'Type',
					default: '3G A',
					choices: [
						{ id: '12G 2-SI', label: '12G 2-SI' },
						{ id: 'QL 3G A 2-SI', label: 'QL 3G A 2-SI' },
						{ id: 'QL 3G A SqDv', label: 'QL 3G A SqDv' },
						{ id: 'QL 3G B 2-SI', label: 'QL 3G B 2-SI' },
						{ id: 'QL 3G B SqDv', label: 'QL 3G B SqDv' },
						{ id: 'DL 6G 2-SI', label: 'DL 6G 2-SI' },
						{ id: '6G 2-SI', label: '6G 2-SI' },
						{ id: 'QL 1.5G SqDv', label: 'QL 1.5G SqDv' },
						{ id: '3G A', label: '3G A' },
						{ id: '3G B', label: '3G B' },
						{ id: '1.5G', label: '1.5G' },
					],
				},
				{
					id: 'width',
					type: 'dropdown',
					label: 'Width',
					default: 1920,
					choices: [
						{ id: 1280, label: '1280' },
						{ id: 1920, label: '1920' },
						{ id: 2048, label: '2048' },
						{ id: 3840, label: '3840' },
						{ id: 4096, label: '4096' },
					],
				},
				{
					id: 'height',
					type: 'dropdown',
					label: 'Height',
					default: 1080,
					choices: [
						{ id: 720, label: '720' },
						{ id: 1080, label: '1080' },
						{ id: 2160, label: '2160' },
					],
				},
			],
			callback: async (event) => {
				const o = event.options
				const payload = {
					manualOverrideEnabled: o.manualOverrideEnabled,
					overrideStandard: {
						format: o.format,
						frame: o.frame,
						gamut: o.gamut,
						height: o.height,
						type: o.type,
						width: o.width,
					},
				}
				await self.apiPut('/analyser/overrideVideoStandard/config', payload)
			},
		},

		analyser_prbs: {
			name: 'Analyser PRBS Config',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					default: 'reset',
					choices: [{ id: 'reset', label: 'Reset' }],
				},
				{
					id: 'receiveMode',
					type: 'dropdown',
					label: 'Receive Mode',
					default: 'Disabled',
					choices: [
						{ id: 'Disabled', label: 'Disabled' },
						{ id: 'PRBS-7', label: 'PRBS-7' },
						{ id: 'PRBS-9', label: 'PRBS-9' },
						{ id: 'PRBS-15', label: 'PRBS-15' },
						{ id: 'PRBS-23', label: 'PRBS-23' },
						{ id: 'PRBS-31', label: 'PRBS-31' },
					],
				},
			],
			callback: async (event) => {
				const o = event.options
				const payload = {
					action: o.action,
					receiveMode: o.receiveMode,
				}
				await self.apiPut('/analyser/prbs', payload)
			},
		},

		dolby_decoder1_config: {
			name: 'Dolby Decoder 1 Config',
			options: [
				{ id: 'group', type: 'number', label: 'SDI Group', default: 1, min: 1, max: 8 },
				{ id: 'pair', type: 'number', label: 'SDI Pair', default: 1, min: 1, max: 2 },
				{ id: 'startingChannel', type: 'number', label: 'startingChannel', default: 1, min: 1, max: 63 },

				{
					id: 'location',
					type: 'dropdown',
					label: 'Location',
					default: 'left',
					choices: [
						{ id: 'subImage1', label: 'subImage1' },
						{ id: 'subImage2', label: 'subImage2' },
						{ id: 'subImage3', label: 'subImage3' },
						{ id: 'subImage4', label: 'subImage4' },
					],
				},
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					default: 'errorsReset',
					choices: [{ id: 'errorsReset', label: 'Reset Errors' }],
				},
			],
			callback: async (event) => {
				const o = event.options
				const payload = {
					source: {
						group: o.group,
						pair: o.pair,
						startingChannel: o.startingChannel,
						location: o.location,
					},
					action: o.action,
				}
				await self.apiPut('/dolbyDecoder1/config', payload)
			},
		},

		eventlogRestApiConfig: {
			name: 'Configure Event Log REST API',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					default: 'enable',
					choices: [
						{ id: 'enable', label: 'Enable' },
						{ id: 'disable', label: 'Disable' },
					],
				},
			],
			callback: async (event) => {
				const o = event.options
				const payload = {
					action: o.action,
				}
				await self.apiPut('/eventlog/config/restApi', payload)
			},
		},

		audioInputPresenceConfig: {
			name: 'Configure Audio Input Presence Event Logging',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					default: 'enable',
					choices: [
						{ id: 'enable', label: 'Enable' },
						{ id: 'disable', label: 'Disable' },
					],
				},
			],
			callback: async (event) => {
				const o = event.options
				const payload = {
					action: o.action,
				}
				await self.apiPut('/eventlog/config/audioInputPresence', payload)
			},
		},
		jitterAlignmentConfig: {
			name: 'Configure Jitter Alignment Event Logging',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					default: 'enable',
					choices: [
						{ id: 'enable', label: 'Enable' },
						{ id: 'disable', label: 'Disable' },
					],
				},
			],
			callback: async (event) => {
				const o = event.options
				const payload = {
					action: o.action,
				}
				await self.apiPut('/eventlog/config/jitterAlignment', payload)
			},
		},

		jitterTimingConfig: {
			name: 'Configure Jitter Timing Event Logging',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					default: 'enable',
					choices: [
						{ id: 'enable', label: 'Enable' },
						{ id: 'disable', label: 'Disable' },
					],
				},
			],
			callback: async (event) => {
				const o = event.options
				const payload = {
					action: o.action,
				}
				await self.apiPut('/eventlog/config/jitterTiming', payload)
			},
		},
		referenceLockingConfig: {
			name: 'Configure Reference Locking Event Logging',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					default: 'enable',
					choices: [
						{ id: 'enable', label: 'Enable' },
						{ id: 'disable', label: 'Disable' },
					],
				},
			],
			callback: async (event) => {
				const o = event.options
				const payload = {
					action: o.action,
				}
				await self.apiPut('/eventlog/config/referenceLocking', payload)
			},
		},
		scte104Config: {
			name: 'Configure SCTE-104 Event Logging',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					default: 'enable',
					choices: [
						{ id: 'enable', label: 'Enable' },
						{ id: 'disable', label: 'Disable' },
					],
				},
			],
			callback: async (event) => {
				const o = event.options
				const payload = {
					action: o.action,
				}
				await self.apiPut('/eventlog/config/scte104', payload)
			},
		},
		sdiInputRateConfig: {
			name: 'Configure SDI Input Rate Event Logging',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					default: 'enable',
					choices: [
						{ id: 'enable', label: 'Enable' },
						{ id: 'disable', label: 'Disable' },
					],
				},
			],
			callback: async (event) => {
				const o = event.options
				const payload = {
					action: o.action,
				}
				await self.apiPut('/eventlog/config/sdiInputRate', payload)
			},
		},
		sdiInputStandardConfig: {
			name: 'Configure SDI Input Standard Event Logging',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					default: 'enable',
					choices: [
						{ id: 'enable', label: 'Enable' },
						{ id: 'disable', label: 'Disable' },
					],
				},
			],
			callback: async (event) => {
				const o = event.options
				const payload = {
					action: o.action,
				}
				await self.apiPut('/eventlog/config/sdiInputStandard', payload)
			},
		},
		sfpConfig: {
			name: 'Configure SFP Event Logging',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					default: 'enable',
					choices: [
						{ id: 'enable', label: 'Enable' },
						{ id: 'disable', label: 'Disable' },
					],
				},
			],
			callback: async (event) => {
				const o = event.options
				const payload = {
					action: o.action,
				}
				await self.apiPut('/eventlog/config/sfp', payload)
			},
		},
		eventlogLogsConfig: {
			name: 'Manage Event Logs',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					default: 'clear',
					choices: [
						{ id: 'clear', label: 'Clear Logs' },
						{ id: 'export', label: 'Export Logs' },
					],
				},
			],
			callback: async (event) => {
				const o = event.options
				const payload = {
					action: o.action,
				}
				await self.apiPut('/eventlog/logs', payload)
			},
		},

		eyeAnalysisParametersConfig: {
			name: 'Configure Eye Analysis Parameters',
			options: [
				{
					id: 'amplitudeMeasurementWindowOffset_percent',
					type: 'number',
					label: 'Amplitude Window Offset (%)',
					default: 0,
					min: 0,
					max: 100,
				},
				{
					id: 'amplitudeMeasurementWindowSize_percent',
					type: 'number',
					label: 'Amplitude Window Size (%)',
					default: 100,
					min: 0,
					max: 100,
				},
				{
					id: 'analysisMethod',
					type: 'textinput',
					label: 'Analysis Method',
					default: 'an Met',
				},
			],
			callback: async (event) => {
				const o = event.options
				const payload = {
					amplitudeMeasurementWindowOffset_percent: o.amplitudeMeasurementWindowOffset_percent,
					amplitudeMeasurementWindowSize_percent: o.amplitudeMeasurementWindowSize_percent,
					analysisMethod: o.analysisMethod,
				}
				await self.apiPut('/eye/analysisParameters', payload)
			},
		},
	})
}
