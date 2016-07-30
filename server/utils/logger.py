# Faraday Penetration Test IDE
# Copyright (C) 2016  Infobyte LLC (http://www.infobytesec.com/)
# See the file 'doc/LICENSE' for the license information

import logging
import server.config

ROOT_LOGGER = 'faraday-server'

def setup_logging():
    logger = logging.getLogger(ROOT_LOGGER)
    logger.propagate = False
    logger.setLevel(server.config.LOGGING_LEVEL)

    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    console_handler = logging.StreamHandler()
    console_handler.setFormatter(formatter)
    logger.addHandler(console_handler)

def get_logger(module_name):
    return logging.getLogger('%s.%s' % (ROOT_LOGGER, module_name))

